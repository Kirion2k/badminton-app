// src/pages/TournamentCreator.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, FormControlLabel, Checkbox } from '@mui/material';
import { useTournaments } from '../context/TournamentContext';

const TournamentCreator = () => {
  const [openStep, setOpenStep] = useState(1);
  const [tournamentType, setTournamentType] = useState('');
  const [tournamentName, setTournamentName] = useState('');
  const [events, setEvents] = useState({
    mensSingles: false,
    womensSingles: false,
    mensDoubles: false,
    womensDoubles: false,
    mixedDoubles: false,
  });
  const [participants, setParticipants] = useState({
    mensSingles: [],
    womensSingles: [],
    mensDoubles: [],
    womensDoubles: [],
    mixedDoubles: [],
  });
  const [participantName, setParticipantName] = useState('');
  const [currentEvent, setCurrentEvent] = useState('');

  const { addTournament } = useTournaments();
  const navigate = useNavigate();

  const eventOrder = [
    'mensSingles',
    'womensSingles',
    'mensDoubles',
    'womensDoubles',
    'mixedDoubles'
  ];

  useEffect(() => {
    const nextEvent = eventOrder.find(event => events[event] && participants[event].length === 0);
    if (nextEvent) {
      setCurrentEvent(nextEvent);
    }
    console.log('Current Event Updated:', nextEvent); // Debug log
  }, [openStep, events, participants]);

  const handleNext = () => {
    let nextStep = openStep + 1;
    console.log('Next Step:', nextStep); // Debug log

    if (nextStep > 2 && nextStep <= eventOrder.length + 2) {
      for (let i = nextStep - 3; i < eventOrder.length; i++) {
        const nextEvent = eventOrder[i];
        if (events[nextEvent]) {
          setCurrentEvent(nextEvent);
          setOpenStep(nextStep);
          console.log('Next Event:', nextEvent); // Debug log
          return;
        }
        nextStep++;
      }
    }
    setOpenStep(nextStep);
  };

  const handleBack = () => {
    let prevStep = openStep - 1;
    console.log('Previous Step:', prevStep); // Debug log

    if (prevStep > 2 && prevStep <= eventOrder.length + 2) {
      for (let i = prevStep - 3; i >= 0; i--) {
        const prevEvent = eventOrder[i];
        if (events[prevEvent]) {
          setCurrentEvent(prevEvent);
          setOpenStep(prevStep);
          console.log('Previous Event:', prevEvent); // Debug log
          return;
        }
        prevStep--;
      }
    }
    setOpenStep(prevStep);
  };

  const handleAddParticipant = (e) => {
    e.preventDefault();
    console.log('Adding participant:', participantName);
    console.log('Current event:', currentEvent);

    if (participantName.trim() && participants[currentEvent]) {
      setParticipants(prevParticipants => {
        const updatedParticipants = {
          ...prevParticipants,
          [currentEvent]: [...prevParticipants[currentEvent], participantName],
        };
        console.log('Participants updated:', updatedParticipants);  // Debug log

        return updatedParticipants;
      });
      setParticipantName(''); // Clear the input field
    }
  };

  const handleEventSelection = (event) => {
    setEvents({ ...events, [event.target.name]: event.target.checked });
    console.log('Events updated:', events);
  };

  const handleCreateTournament = () => {
    const tournament = {
      name: tournamentName,
      type: tournamentType,
      participants: Object.values(participants).flat(),
      matches: tournamentType === 'elimination' ? generateEliminationRounds(participants) : [], // Initialize matches for elimination tournament
    };
    addTournament(tournament);
    navigate('/tournaments');
  };

  const generateEliminationRounds = (participants) => {
    const participantsArray = Object.values(participants).flat();
    if (participantsArray.length === 0) return [];

    const matches = [];
    let matchId = 0;

    const createMatch = (participant1, participant2, round) => ({
      id: (matchId++).toString(),
      participants: [participant1, participant2],
      round: round,
    });

    let currentRound = participantsArray.map((participant, index) => ({
      id: index.toString(),
      name: participant,
    }));

    let roundNumber = 1;

    while (currentRound.length > 1) {
      const nextRound = [];
      for (let i = 0; i < currentRound.length; i += 2) {
        const match = createMatch(currentRound[i], currentRound[i + 1] || { id: 'bye', name: 'bye' }, roundNumber);
        matches.push(match);
        nextRound.push({ id: match.id, name: `${match.participants[0].name} vs ${match.participants[1].name}` });
      }
      currentRound = nextRound;
      roundNumber++;
    }

    return matches;
  };

  const renderParticipantsInput = () => (
    <Box sx={{ display: 'flex', mb: 2 }} component="form" onSubmit={handleAddParticipant}>
      <TextField
        label="Participant Name"
        value={participantName}
        onChange={(e) => setParticipantName(e.target.value)}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" sx={{ ml: 2 }}>
        Add Participant
      </Button>
    </Box>
  );

  const renderEventParticipantsInput = (eventType) => (
    <Box key={eventType}>
      <Typography variant="h6" gutterBottom>
        {`Add Participants for ${eventType.replace(/([A-Z])/g, ' $1').trim()}`}
      </Typography>
      {renderParticipantsInput()}
      <ul>
        {participants[eventType].map((participant, index) => (
          <li key={index}>{participant}</li>
        ))}
      </ul>
    </Box>
  );

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Create Tournament
      </Typography>
      {/* Step 1: Choose Tournament Style */}
      {openStep === 1 && (
        <Box>
          <Typography variant="h6">Choose Tournament Style</Typography>
          <Button
            variant={tournamentType === 'roundRobin' ? 'contained' : 'outlined'}
            onClick={() => setTournamentType('roundRobin')}
            fullWidth
            sx={{ mb: 2 }}
          >
            Round Robin
          </Button>
          <Button
            variant={tournamentType === 'elimination' ? 'contained' : 'outlined'}
            onClick={() => setTournamentType('elimination')}
            fullWidth
          >
            Elimination
          </Button>
          <Button onClick={handleNext} disabled={!tournamentType}>Next</Button>
        </Box>
      )}
      {/* Step 2: Enter Tournament Name and Select Events */}
      {openStep === 2 && (
        <Box>
          <Typography variant="h6">Enter Tournament Details</Typography>
          <TextField
            label="Tournament Name"
            value={tournamentName}
            onChange={(e) => setTournamentName(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Typography variant="h6" component="h2">Select Events</Typography>
          <FormControlLabel control={<Checkbox checked={events.mensSingles} onChange={handleEventSelection} name="mensSingles" />} label="Men's Singles" />
          <FormControlLabel control={<Checkbox checked={events.womensSingles} onChange={handleEventSelection} name="womensSingles" />} label="Women's Singles" />
          <FormControlLabel control={<Checkbox checked={events.mensDoubles} onChange={handleEventSelection} name="mensDoubles" />} label="Men's Doubles" />
          <FormControlLabel control={<Checkbox checked={events.womensDoubles} onChange={handleEventSelection} name="womensDoubles" />} label="Women's Doubles" />
          <FormControlLabel control={<Checkbox checked={events.mixedDoubles} onChange={handleEventSelection} name="mixedDoubles" />} label="Mixed Doubles" />
          <Button onClick={handleBack}>Back</Button>
          <Button onClick={handleNext}>Next</Button>
        </Box>
      )}
      {/* Step 3+: Enter Participants for Each Event */}
      {eventOrder.map((event, index) => (
        openStep === index + 3 && events[event] && (
          <Box key={event}>
            {renderEventParticipantsInput(event)}
            <Button onClick={handleBack}>Back</Button>
            <Button onClick={handleNext}>Next</Button>
          </Box>
        )
      ))}
      {/* Final Step: Review and Create Tournament */}
      {openStep === eventOrder.length + 3 && (
        <Box>
          <Typography variant="h6">Review and Create Tournament</Typography>
          <Typography variant="h6">Tournament Type: {tournamentType}</Typography>
          <Typography variant="h6">Tournament Name: {tournamentName}</Typography>
          <Typography variant="h6">Events:</Typography>
          <ul>
            {Object.keys(events).filter((key) => events[key]).map((event) => (
              <li key={event}>
                {event.replace(/([A-Z])/g, ' $1').trim()}: {participants[event].join(', ')}
              </li>
            ))}
          </ul>
          <Button onClick={handleBack}>Back</Button>
          <Button onClick={handleCreateTournament}>Create</Button>
        </Box>
      )}
    </Container>
  );
};

export default TournamentCreator;

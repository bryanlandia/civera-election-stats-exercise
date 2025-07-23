// Tenant and Jurisdiction Models
export interface Tenant {
  id: string;
  name: string;
  jurisdictionId: string;
}

export interface Jurisdiction {
  id: string;
  name: string;
  registeredVoters: number;
  parentJurisdictionId?: string;
  partisanContestTypes: string[];
  nonPartisanContestTypes: string[];
}

// Party and Political Models
export interface Party {
  id: string;
  name: string;
  color: string;
}

export interface Candidate {
  id: string;
  name: string;
  partyId?: string;
  position?: string; // For tickets (e.g., "God-Emperor", "Chief Sycophant")
}

export interface Ticket {
  id: string;
  partyId?: string;
  candidates: Candidate[];
}

// Election Models
export interface Office {
  id: string;
  name: string;
  description: string;
  jurisdictionId: string;
  isElected: boolean; // true for elected positions, false for appointed
  termLength?: number; // in years
  maxTerms?: number; // maximum number of consecutive terms, undefined for no limit
}

export interface QuestionType {
  id: string;
  name: string;
  description: string;
  category:
    | 'Constitutional Amendment'
    | 'Bond Issue'
    | 'Tax Levy'
    | 'Initiative'
    | 'Referendum'
    | 'Other';
  requiresSupermajority: boolean; // true if requires more than simple majority
  minimumTurnoutRequired?: number; // percentage of registered voters required to participate
}

export type ElectionStage =
  | 'Just Shopping'
  | 'Extremely Buttery Party Primary'
  | 'Vegan Imperium Party Primary'
  | 'General Election';

export interface Election {
  id: string;
  name: string;
  date: string;
  stage: ElectionStage;
  jurisdictionId: string;
  officeId?: string; // Connect to Office
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface Contest {
  id: string;
  electionId: string;
  jurisdictionId: string;
  name: string;
  isPartisan: boolean;
  isTicketBased: boolean; // true for tickets, false for single candidates
  tickets?: Ticket[];
  candidates?: Candidate[];
}

export interface BallotQuestion {
  id: string;
  electionId: string;
  jurisdictionId: string;
  questionTypeId: string; // Reference to QuestionType
  shortTitle: string;
  extendedText: string;
  passed: boolean;
  yesVotes: number;
  noVotes: number;
  yesPercentage: number;
  noPercentage: number;
}

// Results Models
export interface ContestResult {
  contestId: string;
  totalVotes: number;
  results: Array<{
    ticketId?: string;
    candidateId?: string;
    votes: number;
    percentage: number;
    winner: boolean;
    disqualified?: boolean;
    disqualificationReason?: string;
  }>;
}

export interface ElectionResult {
  id: string;
  electionId: string;
  totalVotes: number;
  reportingPercentage: number;
  contestResults: ContestResult[];
  ballotQuestionResults?: Array<{
    ballotQuestionId: string;
    yesVotes: number;
    noVotes: number;
    yesPercentage: number;
    noPercentage: number;
    passed: boolean;
  }>;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

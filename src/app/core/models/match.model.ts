import { TeamDTO } from "./team.model";

export interface MatchDTO {
    teamDTO1: TeamDTO;
    teamDTO2: TeamDTO;

    scoreTeam1: number;
    scoreTeam2: number;
}
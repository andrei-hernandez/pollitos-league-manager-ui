import { TeamDTO } from "./team.model";

export interface MatchDTO {
    teamDTO01: TeamDTO;
    teamDTO02: TeamDTO;

    scoreTeam1: number;
    scoreTeam2: number;
}
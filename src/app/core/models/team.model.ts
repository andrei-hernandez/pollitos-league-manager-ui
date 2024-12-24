import {PlayerDTO} from './player.model';

export interface TeamDTO{
    id?: number;
    name: string;
    playerDTOS: PlayerDTO[];
    league: string;
}
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsIn } from 'class-validator';

export class CreateStarshipDto {
  @ApiProperty({
    description: 'Le nom du vaisseau spatial',
    example: 'USS Enterprise',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Le modèle du vaisseau spatial',
    example: 'NCC-1701-D',
  })
  @IsString()
  model: string;

  @ApiProperty({
    description: "Le nombre de membres d'équipage",
    example: 1000,
  })
  @IsNumber()
  crew: number;

  @ApiProperty({
    description: 'Le statut du vaisseau',
    example: 'operational',
    enum: ['operational', 'maintenance', 'damaged', 'decommissioned'],
  })
  @IsString()
  @IsIn(['operational', 'maintenance', 'damaged', 'decommissioned'])
  status: string;
}

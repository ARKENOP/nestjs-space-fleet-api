import { ApiProperty } from '@nestjs/swagger';

export class Starship {
  @ApiProperty({
    description: 'Identifiant unique du vaisseau',
    example: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
  })
  id: string;

  @ApiProperty({
    description: 'Le nom du vaisseau spatial',
    example: 'USS Enterprise',
  })
  name: string;

  @ApiProperty({
    description: 'Le modèle du vaisseau spatial',
    example: 'NCC-1701-D',
  })
  model: string;

  @ApiProperty({
    description: "Le nombre de membres d'équipage",
    example: 1000,
  })
  crew: number;

  @ApiProperty({
    description: 'Le statut du vaisseau',
    example: 'operational',
    enum: ['operational', 'maintenance', 'damaged', 'decommissioned'],
  })
  status: string;
}

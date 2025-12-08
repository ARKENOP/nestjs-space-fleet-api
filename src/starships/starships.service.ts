import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { Starship } from './entities/starship.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StarshipsService {
  private starships: Starship[] = [
    {
      id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
      name: 'USS Enterprise',
      model: 'NCC-1701-D',
      crew: 1000,
      status: 'operational',
    },
    {
      id: '2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q',
      name: 'Millennium Falcon',
      model: 'YT-1300',
      crew: 6,
      status: 'operational',
    },
    {
      id: '3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r',
      name: 'Serenity',
      model: 'Firefly',
      crew: 9,
      status: 'maintenance',
    },
  ];

  create(createStarshipDto: CreateStarshipDto): Starship {
    const newStarship: Starship = {
      id: uuidv4(),
      ...createStarshipDto,
    };
    this.starships.push(newStarship);
    return newStarship;
  }

  findAll(): Starship[] {
    return this.starships;
  }

  findOne(id: string): Starship {
    const starship = this.starships.find((ship) => ship.id === id);
    if (!starship) {
      throw new NotFoundException(`Vaisseau avec l'id ${id} non trouvé`);
    }
    return starship;
  }

  update(id: string, updateStarshipDto: UpdateStarshipDto): Starship {
    const starshipIndex = this.starships.findIndex((ship) => ship.id === id);
    if (starshipIndex === -1) {
      throw new NotFoundException(`Vaisseau avec l'id ${id} non trouvé`);
    }

    const updatedStarship = {
      ...this.starships[starshipIndex],
      ...updateStarshipDto,
    };
    this.starships[starshipIndex] = updatedStarship;
    return updatedStarship;
  }

  remove(id: string): void {
    const starshipIndex = this.starships.findIndex((ship) => ship.id === id);
    if (starshipIndex === -1) {
      throw new NotFoundException(`Vaisseau avec l'id ${id} non trouvé`);
    }
    this.starships.splice(starshipIndex, 1);
  }
}

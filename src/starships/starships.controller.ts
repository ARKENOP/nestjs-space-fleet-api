import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { StarshipsService } from './starships.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { Starship } from './entities/starship.entity';

@ApiTags('starships')
@Controller('starships')
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) {}

  @Post()
  @ApiOperation({ summary: 'Ajouter un nouveau vaisseau à la flotte' })
  @ApiResponse({
    status: 201,
    description: 'Le vaisseau a été créé avec succès.',
    type: Starship,
  })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  create(@Body() createStarshipDto: CreateStarshipDto): Starship {
    return this.starshipsService.create(createStarshipDto);
  }

  @Get()
  @ApiOperation({ summary: 'Liste tous les vaisseaux de la flotte' })
  @ApiResponse({
    status: 200,
    description: 'Retourne la liste de tous les vaisseaux.',
    type: [Starship],
  })
  findAll(): Starship[] {
    return this.starshipsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Récupère les détails d'un vaisseau spécifique" })
  @ApiParam({
    name: 'id',
    description: "L'identifiant unique du vaisseau",
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Retourne les détails du vaisseau.',
    type: Starship,
  })
  @ApiResponse({ status: 404, description: 'Vaisseau non trouvé.' })
  findOne(@Param('id') id: string): Starship {
    return this.starshipsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: "Met à jour les informations d'un vaisseau existant",
  })
  @ApiParam({
    name: 'id',
    description: "L'identifiant unique du vaisseau",
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Le vaisseau a été mis à jour avec succès.',
    type: Starship,
  })
  @ApiResponse({ status: 404, description: 'Vaisseau non trouvé.' })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  update(
    @Param('id') id: string,
    @Body() updateStarshipDto: UpdateStarshipDto,
  ): Starship {
    return this.starshipsService.update(id, updateStarshipDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprime un vaisseau de la flotte' })
  @ApiParam({
    name: 'id',
    description: "L'identifiant unique du vaisseau",
    type: String,
  })
  @ApiResponse({
    status: 204,
    description: 'Le vaisseau a été supprimé avec succès.',
  })
  @ApiResponse({ status: 404, description: 'Vaisseau non trouvé.' })
  remove(@Param('id') id: string): void {
    return this.starshipsService.remove(id);
  }
}

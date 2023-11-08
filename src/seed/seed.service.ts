import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/httpAdapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter,
  ){}

  async populateDB() {

    await this.pokemonModel.deleteMany(); // delete all
    
    const pokemonsToInsert: { no: number, name: string} [] = [];

    const data = await this.http.get<PokeResponse>( 'https://pokeapi.co/api/v2/pokemon?limit=10' );
    
    data.results.forEach( ({ name, url }) => {
      const parts = url.split('/');
      const no = +parts[parts.length-2];

      pokemonsToInsert.push( {no, name} );
    });

    await this.pokemonModel.insertMany(pokemonsToInsert);

    return "Seed Excecuted";
  }

}

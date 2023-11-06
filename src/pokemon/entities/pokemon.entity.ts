import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document {

    // id:string (consecutivo que se crea automáticamente // no es necesario porque Mongo lo suministra
    @Prop({
        unique: true,
        index: true,
    })
    name: string;
        
    @Prop({
        unique: true,
        index: true,
    })
    no: number;

}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
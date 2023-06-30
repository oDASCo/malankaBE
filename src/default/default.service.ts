import {Injectable} from "@nestjs/common";
import {InjectModel, Prop} from "@nestjs/mongoose";
import {HydratedDocument, Model} from "mongoose";
import {ApiProperty} from "@nestjs/swagger";
import {Combo, ComboDocument} from "../schemas/combo.schema";
import {Classes, ClassesDocument} from "../schemas/class.schema";



@Injectable()
export class DefaultService {

}

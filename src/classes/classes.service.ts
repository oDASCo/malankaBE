import {Injectable} from "@nestjs/common";
import {InjectModel, Prop} from "@nestjs/mongoose";
import {HydratedDocument, Model} from "mongoose";
import {ApiProperty} from "@nestjs/swagger";
import {Combo, ComboDocument} from "../schemas/combo.schema";
import {Classes, ClassesDocument} from "../schemas/class.schema";

export class ClassesType {
    id: string;
    @ApiProperty()
    userId: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    elements: [];
    @ApiProperty()
    category: string;
}


@Injectable()
export class ClassesService {
    constructor(@InjectModel(Classes.name) private classesModel: Model<ClassesDocument>) {}

    async createClass(item: ClassesType): Promise<Combo> {
        const newItem = new this.classesModel(item);
        return newItem.save();
    }

    async findAll(params): Promise<Classes[]> {
        return this.classesModel.find(params);
    }

    async findItemById(id: string): Promise<Classes> {
        return this.classesModel.findById(id);
    }
}

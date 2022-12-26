import {Injectable} from "@nestjs/common";
import {InjectModel, Prop} from "@nestjs/mongoose";
import {HydratedDocument, Model} from "mongoose";
import {ApiProperty} from "@nestjs/swagger";
import {Element, ElementDocument, ElementSchema} from "../schemas/element.schema";
import {Combo, ComboDocument} from "../schemas/combo.schema";

export class ComboType {
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
export class ComboService {
    constructor(@InjectModel(Combo.name) private comboModel: Model<ComboDocument>) {}

    async addCombo(item: ComboType): Promise<Combo> {
        const newItem = new this.comboModel(item);
        return newItem.save();
    }

    async findAll(): Promise<Combo[]> {
        return this.comboModel.find({});
    }

    async findItemById(id: string): Promise<Combo> {
        return this.comboModel.findById(id);
    }
}

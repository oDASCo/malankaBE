import {Injectable} from "@nestjs/common";
import {InjectModel, Prop} from "@nestjs/mongoose";
import {HydratedDocument, Model} from "mongoose";
import {ApiProperty} from "@nestjs/swagger";
import {Element, ElementDocument, ElementSchema} from "../schemas/element.schema";

export class ElementType {
    id: string;
    @ApiProperty()
    userId: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    desc: string;
    @ApiProperty()
    category: string;
    @ApiProperty()
    photo: string;
    @ApiProperty()
    video: string;
    @ApiProperty()
    level: string;
    @ApiProperty()
    createdBy: string;
    @ApiProperty()
    learnDate: string;
    @ApiProperty()
    catalogElementId: string;
}


@Injectable()
export class ElementService {
    constructor(@InjectModel(Element.name) private elementModel: Model<ElementDocument>) {}

    async addElementt(item: ElementType): Promise<Element> {
        const newItem = new this.elementModel(item);
        return newItem.save();
    }

    async findAll(): Promise<Element[]> {
        return this.elementModel.find({});
    }

    async findItemById(id: string): Promise<Element> {
        return this.elementModel.findById(id);
    }
}

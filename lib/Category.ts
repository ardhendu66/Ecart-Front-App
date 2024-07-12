import { Schema, model, models, Types, Document } from "mongoose"

interface CategoryClass extends Document {
    name: string,
    parent?: string,
    properties?: Object,
}

const categorySchema: Schema<CategoryClass> = new Schema<CategoryClass>({
    name: {
        type: String,
        required: [true, 'Name must be required']
    },
    parent: {
        type: Types.ObjectId,
        ref: 'Category'
    },
    properties: {
        type: Object,
    }
})

const CategoryModel = models?.Category || model('Category', categorySchema)

export default CategoryModel;
import { serializable, serialize, deserialize } from "serializr";
import { TransactionDetails } from "./transaction-details.model";
export class Transactions{
    @serializable
    public status : String;
    @serializable
    public message : String;
    @serializable
    public result : TransactionDetails[];

    public deserialize(input:any): this{
        console.log(input)
        return Object.assign(this, deserialize(Transactions, input));
    };

    public serialize(): JSON{
        return serialize(this);
    }
} 
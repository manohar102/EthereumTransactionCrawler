import { serializable, serialize, deserialize } from "serializr";
import { TransactionDetails } from "./transaction-details.model";
export class Transactions{
    static deserialize(data: void | Transactions) {
      throw new Error('Method not implemented.');
    }
    @serializable
    public status : String;
    @serializable
    public message : String;
    @serializable
    public result : TransactionDetails[];

    public deserialize(input:any): this{
        return Object.assign(this, deserialize(Transactions, input));
    };

    public serialize(): JSON{
        return serialize(this);
    }
} 
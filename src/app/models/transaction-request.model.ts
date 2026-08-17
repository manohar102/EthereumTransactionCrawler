import { serializable, serialize, deserialize } from "serializr";
export class TransactionRequest{
    @serializable
    public address : String;
    @serializable
    public startBlock : String;
    @serializable
    public startDate : Date;
    @serializable
    public endDate : Date;
    
    public deserialize(input:any): this{
        return Object.assign(this,deserialize(TransactionRequest, input));
    };

    public serialize(): JSON{
        return serialize(this);
    }
}
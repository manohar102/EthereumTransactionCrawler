import { serializable, serialize, deserialize } from "serializr";
export class TransactionDetails{
    @serializable
    public blockNumber : String;
    @serializable
    public timeStamp : String;
    @serializable
    public hash : String;
    @serializable
    public nonce : String;
    @serializable
    public blockHash : String;
    @serializable
    public transactionIndex : String;
    @serializable
    public from : String;
    @serializable
    public to : String;
    @serializable
    public value : String;
    @serializable
    public gas : String;
    @serializable
    public gasPrice : String;
    @serializable
    public isError : String;
    @serializable
    public txreceipt_status : String;
    @serializable
    public input : String;
    @serializable
    public contractAddress : String;
    @serializable
    public cumulativeGasUsed : String;
    @serializable
    public gasUsed : String;
    @serializable
    public confirmations : String;

    public deserialize(input:any): this{
        console.log(input)
        return Object.assign(this,deserialize(TransactionDetails, input));
    };

    public serialize(): JSON{
        return serialize(this);
    }
}
import { Id } from "@/convex/_generated/dataModel";

export type Agent={
    _id:Id<"AgentTable">,
    agentId:string,
    name:string,
    config?:any,
    published:boolean,
    nodes?:any,
    edges?:any,
    userId:Id<"UserTable">,
    _creationTime:number,
    agentToolConfig?:any

}
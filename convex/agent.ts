import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateAgent = mutation({
    args: {
        name: v.string(),
        agentId: v.string(),
        userId: v.id('UserTable'),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.insert('AgentTable', {
            name: args.name,
            agentId: args.agentId,
            published: false,
            userId: args.userId,
            nodes: [
                {
                    id: 'start',
                    type: 'StartNode',
                    position: { x: 0, y: 0 },
                    data: { label: 'Start' }
                }
            ],
            edges: [],
        });
        return result;
    }
});

export const GetUserAgents = query({
    args: {
        userId: v.id('UserTable'),
    },
    handler: async (ctx, args) => {
        const agents = await ctx.db.query('AgentTable')
            .filter((q) => q.eq(q.field('userId'), args.userId))
            .order('desc')
            .collect();
        return agents;
    }
});

export const GetAgentById = query({
    args: {
        agentId: v.string(),
    },
    handler: async (ctx, args) => {
        const agent = await ctx.db.query('AgentTable')  
            .filter((q) => q.eq(q.field('agentId'), args.agentId))
            .order('desc')
            .collect();
        return agent[0];
    }
});

export const UpdateAgentDetail= mutation({
    args: {
        id: v.id('AgentTable'),
        nodes: v.any(),
        edges: v.any(),

    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, {
            nodes: args.nodes,
            edges: args.edges,
        });
    }
});

export const UpdateAgentToolConfigs=mutation({
    args:{
         id: v.id('AgentTable'),
         agentToolConfig:v.any()
    },
    handler:async(ctx,args)=>{
        await ctx.db.patch(args.id,{
            agentToolConfig:args.agentToolConfig
        })
    }
})

export const PublishAgent = mutation({
    args: {
        id: v.id('AgentTable'),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, {
            published: true,
        });
    }
})

export const GetPublishedAgents = query({
    handler: async (ctx) => {
        const agents = await ctx.db.query('AgentTable')
            .filter((q) => q.eq(q.field('published'), true))
            .order('desc')
            .collect();
        return agents;
    }
});

export const ClonePublishedAgent = mutation({
    args: {
        templateId: v.id('AgentTable'),
        userId: v.id('UserTable'),
        agentId: v.string(),
    },
    handler: async (ctx, args) => {
        const template = await ctx.db.get(args.templateId);
        if (!template) {
            throw new Error("Template not found");
        }
        if (!template.published) {
            throw new Error("Only published agents can be cloned");
        }

        const clonedAgentId = await ctx.db.insert('AgentTable', {
            name: `${template.name} Copy`,
            agentId: args.agentId,
            published: false,
            userId: args.userId,
            config: template.config,
            nodes: template.nodes,
            edges: template.edges,
            agentToolConfig: template.agentToolConfig,
        });

        return clonedAgentId;
    }
})

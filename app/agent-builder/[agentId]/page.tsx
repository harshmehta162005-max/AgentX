"use client"
import React, { use, useCallback, useContext, useEffect, useState } from 'react'
import Header from '../_components/Header'
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, MiniMap, Controls, Panel, OnSelectionChangeParams, useOnSelectionChange } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import StartNode from '../_customNodes/StartNode';
import AgentNode from '../_customNodes/AgentNode';
import AgentToolsPanel from '../_components/AgentToolsPanel';
import { WorkflowContext } from '@/context/WorkflowContext';

import { useParams } from 'next/navigation';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Agent } from '@/types/AgentType';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import EndNode from '../_customNodes/EndNode';
import IfElseNode from '../_customNodes/IfElseNode';
import WhileNode from '../_customNodes/WhileNode';
import UserApprovalNode from '../_customNodes/UserApprovalNode';
import ApiNode from '../_customNodes/ApiNode';
import SettingPanel from '../_components/SettingPanel';
// const initialNodes = [

// ];
// const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];
export const nodeTypes = {
    StartNode: StartNode,
    AgentNode: AgentNode,
    EndNode: EndNode,
    IfElseNode:IfElseNode,
    WhileNode:WhileNode,
    UserApprovalNode:UserApprovalNode,
    ApiNode:ApiNode
};
function AgentBuilder() {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const { agentId } = useParams();
    const { addedNodes, setAddedNodes, nodeEdges, setNodeEdges,setSelectedNode } = useContext(WorkflowContext);
    const convex = useConvex();
    const [agentDetail, setAgentDetail] = useState<Agent>();
    const UpdateAgentDetail = useMutation(api.agent.UpdateAgentDetail);
    useEffect(() => {
        GetAgentDetail();
    }, []);
    const GetAgentDetail = async () => {
        const result = await convex.query(api.agent.GetAgentById, {
            agentId: agentId as string,
        });
        setAgentDetail(result);
    }
    useEffect(() => {
        if (agentDetail) {
            setNodes(agentDetail.nodes || []);
            setEdges(agentDetail.edges || []);
            setAddedNodes(agentDetail.nodes || []);
            setNodeEdges(agentDetail.edges || []);
        }
    }, [agentDetail]);
    useEffect(() => {
        addedNodes && setNodes(addedNodes);
    }, [addedNodes]);
    useEffect(() => {
        edges && setNodeEdges(edges);
    }, [edges]);

    const onNodesChange = useCallback(
        (changes: any) => setNodes((nodesSnapshot) => {
            const updated = applyNodeChanges(changes, nodesSnapshot);
            setAddedNodes(updated);
            return updated;
        }
        ),
        [setAddedNodes],
    );
    // useEffect(() => {
    //     (nodes || edges) && SaveNodesAndEdges();
    // }, [nodes, edges]);

    const SaveNodesAndEdges = () => {
        const result = UpdateAgentDetail({
            id: agentDetail?._id!,
            nodes: addedNodes,
            edges: nodeEdges,
        });
        toast.success("Saved Successfully!");
    }
    const onEdgesChange = useCallback(
        (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect = useCallback(
        // @ts-ignore
        (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );
    const onNodeSelect=useCallback(({nodes,edges}:OnSelectionChangeParams)=>{
        setSelectedNode(nodes[0]);
    },[]);
    useOnSelectionChange({
        onChange:onNodeSelect
    })

    return (
        <div>
            <Header agentDetail={agentDetail} />
            <div style={{ width: '100vw', height: '90vh' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                    nodeTypes={nodeTypes}
                >
                    <Controls />
                    <MiniMap />
                    {/* @ts-ignore */}
                    <Background variant='dots' gap={12} size={1} />
                    <Panel position='top-left'>
                        <AgentToolsPanel />
                    </Panel>
                    <Panel position='top-right'>
                        <SettingPanel />
                    </Panel>
                    <Panel position='bottom-center'>
                        <Button onClick={SaveNodesAndEdges}><Save /> Save</Button>
                    </Panel>
                </ReactFlow>
            </div>
        </div>
    )
}

export default AgentBuilder

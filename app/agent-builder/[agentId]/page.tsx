"use client"
import React, { use, useCallback, useContext, useEffect, useState } from 'react'
import Header from '../_components/Header'
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, MiniMap, Controls, Panel, OnSelectionChangeParams, useOnSelectionChange } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import AgentToolsPanel from '../_components/AgentToolsPanel';
import { WorkflowContext } from '@/context/WorkflowContext';

import { useParams } from 'next/navigation';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Agent } from '@/types/AgentType';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import SettingPanel from '../_components/SettingPanel';
import { nodeTypes } from '../_customNodes/nodeTypes';
// const initialNodes = [

// ];
// const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];
const DEFAULT_START_NODES = [
    {
        id: 'start',
        type: 'StartNode',
        position: { x: 0, y: 0 },
        data: { label: 'Start' }
    }
];
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
            const initialNodes = agentDetail.nodes?.length ? agentDetail.nodes : DEFAULT_START_NODES;
            const initialEdges = agentDetail.edges || [];

            setNodes(initialNodes);
            setEdges(initialEdges);
            setAddedNodes(initialNodes);
            setNodeEdges(initialEdges);

            // Backfill older agents that were created without default nodes.
            if (!agentDetail.nodes?.length && agentDetail?._id) {
                UpdateAgentDetail({
                    id: agentDetail._id,
                    nodes: DEFAULT_START_NODES,
                    edges: initialEdges,
                });
            }
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

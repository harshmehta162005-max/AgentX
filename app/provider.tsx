"use client";
import { UserDetailContext } from '@/context/UserDetailContext';
import { WorkflowContext } from '@/context/WorkflowContext';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { ReactFlowProvider } from '@xyflow/react';
import { useMutation } from 'convex/react';
import { set } from 'date-fns';
import { User } from 'lucide-react';
import React, { useEffect, useState } from 'react'

function Provider(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>
) {
    const { user } = useUser();
    const createUser = useMutation(api.user.CreateNewUser);
    const [userDetail, setUserDetail] = useState<any>(null);
    const [selectedNode, setSelectedNode] = useState<any>();
    const [addedNodes, setAddedNodes] = useState([
        {
            id: 'start',
            type: 'StartNode',
            position: { x: 0, y: 0 },
            data: { label: 'Start' }
        }
    ])
    const [nodeEdges, setNodeEdges] = useState([]);
    useEffect(() => {
        user &&
            CreateAndGetUser();
    }, [user]);
    const CreateAndGetUser = async () => {
        // Logic to create and get user*++0.
        if (user) {
            const result = await createUser({
                name: user.fullName || " ",
                email: user.primaryEmailAddress?.emailAddress || " ",
            });
            setUserDetail(result);
        }
    }
    return (
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
            <ReactFlowProvider>
                <WorkflowContext.Provider value={{ addedNodes, setAddedNodes, nodeEdges, setNodeEdges, selectedNode, setSelectedNode }}>
                    <div>
                        {children}
                    </div>
                </WorkflowContext.Provider>
            </ReactFlowProvider>
        </UserDetailContext.Provider >
    )
}

export default Provider

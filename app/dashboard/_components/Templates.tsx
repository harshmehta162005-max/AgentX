"use client";

import { Button } from '@/components/ui/button';
import { UserDetailContext } from '@/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import { Agent } from '@/types/AgentType';
import { useConvex, useMutation } from 'convex/react';
import { Copy, Loader2Icon } from 'lucide-react';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

function Templates() {
  const { userDetail } = useContext(UserDetailContext);
  const [templateList, setTemplateList] = useState<Agent[]>([]);
  const [cloningTemplateId, setCloningTemplateId] = useState<string | null>(null);
  const convex = useConvex();
  const clonePublishedAgent = useMutation(api.agent.ClonePublishedAgent);
  const router = useRouter();

  useEffect(() => {
    GetTemplates();
  }, []);

  const GetTemplates = async () => {
    const result = await convex.query(api.agent.GetPublishedAgents, {});
    setTemplateList(result);
  };

  const OnUseTemplate = async (templateId: string) => {
    if (!userDetail?._id) {
      toast.error("Please sign in first");
      return;
    }

    try {
      setCloningTemplateId(templateId);
      const newAgentId = uuidv4();
      await clonePublishedAgent({
        templateId: templateId as any,
        userId: userDetail._id,
        agentId: newAgentId,
      });
      toast.success("Template added to your agents");
      router.push('/agent-builder/' + newAgentId);
    } catch (error) {
      toast.error("Failed to use template");
    } finally {
      setCloningTemplateId(null);
    }
  };

  return (
    <div className='w-full mt-5'>
      {templateList.length === 0 ? (
        <p className='text-sm text-gray-500'>No published templates yet.</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
          {templateList.map((template) => (
            <div key={template._id} className='p-4 border rounded-2xl shadow space-y-3'>
              <div>
                <h2 className='font-bold text-lg'>{template.name}</h2>
                <p className='text-sm text-gray-400 mt-1'>
                  Published {moment(template._creationTime).fromNow()}
                </p>
              </div>
              <Button
                className='w-full'
                onClick={() => OnUseTemplate(template._id)}
                disabled={cloningTemplateId === template._id}
              >
                {cloningTemplateId === template._id ? (
                  <Loader2Icon className='animate-spin' />
                ) : (
                  <Copy />
                )}
                Use Template
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Templates;

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    CodeBlock,
    CodeBlockHeader,
    CodeBlockFiles,
    CodeBlockFilename,
    CodeBlockSelect,
    CodeBlockSelectTrigger,
    CodeBlockSelectValue,
    CodeBlockSelectContent,
    CodeBlockSelectItem,
    CodeBlockCopyButton,
    CodeBlockBody,
    CodeBlockItem,
    CodeBlockContent,
    type BundledLanguage,
} from "@/components/ui/code-block";

const data = [
    {
        language: "ts",
        filename: "example.ts",
        code: `
        const res = await fetch('https://agentX.com/api/agent-chat', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                agentId:<agentId>,
                userId:<userId>,
                userInput:<userInput>,

            })
        })
        if (!res.body) return;
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        setMessages((prev) => [...prev, { role: 'assistant', content: '' }])
        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            if (value) {
                console.log(decoder.decode(value));
                const chunk = decoder.decode(value);
                //Process chunk..
            }
        }
        `
    },
]

type Props = {
    openDialog: boolean,
    setOpenDialog: (open: boolean) => void
}
function PublishCodeDialog({ openDialog, setOpenDialog }: Props) {

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>

            <DialogContent className='min-w-3xl '>
                <DialogHeader>
                    <DialogTitle>Get Code</DialogTitle>
                    <DialogDescription>
                        <CodeBlock data={data} defaultValue={data[0].language}>
                            <CodeBlockHeader>
                                <CodeBlockFiles>
                                    {(item) => (
                                        <CodeBlockFilename key={item.language} value={item.language}>
                                            {item.filename}
                                        </CodeBlockFilename>
                                    )}
                                </CodeBlockFiles>

                                <CodeBlockSelect>
                                    <CodeBlockSelectTrigger>
                                        <CodeBlockSelectValue />
                                    </CodeBlockSelectTrigger>
                                    <CodeBlockSelectContent>
                                        {(item) => (
                                            <CodeBlockSelectItem key={item.language} value={item.language}>
                                                {item.language.toUpperCase()}
                                            </CodeBlockSelectItem>
                                        )}
                                    </CodeBlockSelectContent>
                                </CodeBlockSelect>

                                <CodeBlockCopyButton />
                            </CodeBlockHeader>

                            <CodeBlockBody>
                                {(item) => (
                                    <CodeBlockItem key={item.language} value={item.language}>
                                        <CodeBlockContent language={item.language as BundledLanguage}>
                                            {item.code}
                                        </CodeBlockContent>
                                    </CodeBlockItem>
                                )}
                            </CodeBlockBody>
                        </CodeBlock>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default PublishCodeDialog
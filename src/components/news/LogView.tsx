
'use client';

import { useEffect } from 'react';

interface LogViewProps {
    articleId: string;
}

export function LogView({ articleId }: LogViewProps) {
    useEffect(() => {
        const logView = async () => {
            try {
                await fetch('/api/log-article-view', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ article_id: articleId }),
                });
            } catch (error) {
                console.error('Error logging article view:', error);
            }
        };

        logView();
    }, [articleId]);

    return null;
}

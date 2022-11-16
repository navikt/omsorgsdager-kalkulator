import React from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';

interface Props {
    title: string;
    children: React.ReactNode;
}

const DocumentTitle = ({ title, children }: Props) => {
    useDocumentTitle(title);
    return <>{children}</>;
};

export default DocumentTitle;

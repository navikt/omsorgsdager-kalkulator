import React from 'react';
import Lenke from 'nav-frontend-lenker';

interface Props {
    className?: string;
    onClick: () => void;
    children: React.ReactNode;
}

const stopClickEvent = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.stopPropagation();
    evt.preventDefault();
};

const ValidationErrorLink = ({ onClick, children, className }: Props) => {
    return (
        <Lenke
            className={className}
            href="#"
            onClick={(evt) => {
                stopClickEvent(evt);
                onClick();
            }}>
            {children}
        </Lenke>
    );
};

export default ValidationErrorLink;

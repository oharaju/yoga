import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import tokens from '@gympass/tokens';

import createTree from './tree';

const Wrapper = styled.div`
  height: 100%;
  grid-area: Navigation;
  box-shadow: inset -1px 0px 0px #f6f6f6;
`;

const List = styled.ul`
  margin: 0;
  padding: 0px;
  list-style-type: none;
  font-size: 14px;
  width: 100%;
`;

const AnchorLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
  display: block;
  text-indent: ${({ level }) => `calc(15px * ${level})`};
  margin: 10px 0;
  border-right: 1px solid transparent;
  padding: 10px 100px 10px 45px;
`;

const ListItem = styled.li`
  & > ${AnchorLink} {
    ${({ active }) =>
      active &&
      `
      border-right: 1px solid #F46152;
      background-color: rgba(244, 97, 82, 0.05);
      color: #F46152;
      font-weight: 500;
  `}
  }
`;

const getHtml = (tree, level = 0) =>
  Object.values(tree).map(({ title, url, ...childs }) => (
    <ListItem key={url} active={window.location.pathname === url}>
      <AnchorLink to={url} level={level}>
        {title}
      </AnchorLink>
      {Boolean(Object.keys(childs).length) && (
        <List level={level}>{getHtml(childs, level + 1)}</List>
      )}
    </ListItem>
  ));

const Navigation = ({ items }) => {
  const tree = createTree(items);
  return (
    <Wrapper>
      <List level={0}>{getHtml(tree)}</List>
    </Wrapper>
  );
};

export default Navigation;

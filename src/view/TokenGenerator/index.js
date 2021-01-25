import React from 'react';
import Devider from '../../components/devider';
import GenerateToken from './GenerateToken';
import TokenList from './TokenList'

export default function TokenGenerator() {
    return (
      <>
        <GenerateToken />
        <Devider />
        <TokenList />
      </>
    );
}
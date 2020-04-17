import { createContext } from 'react';

const TitleContext = createContext({ title: 'Название', setTitle: () => {} });

export default TitleContext;

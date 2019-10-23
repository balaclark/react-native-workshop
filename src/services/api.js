export const mockMessages = [
  {
    incoming: true,
    message: 'Oi',
  },
  {
    incoming: false,
    message: 'Hello',
  },
  {
    incoming: true,
    message: 'Wassup?',
  },
];

export const conversations = [
  {
    id: '1',
    title: 'John',
    description: 'Hey there',
    avatar: 'https://i.pravatar.cc/150?img=70',
    messages: mockMessages,
  },
  {
    id: '2',
    title: 'Jane',
    description: 'Hola!',
    avatar: 'https://i.pravatar.cc/150?img=48',
    messages: mockMessages,
  },
  {
    id: '3',
    title: 'Janet',
    description: 'O hai :D',
    avatar: 'https://i.pravatar.cc/150?img=22',
    messages: mockMessages,
  },
  {
    id: '4',
    title: 'Jimmy',
    description: 'Hello... It’s me...',
    avatar: 'https://i.pravatar.cc/150?img=64',
    messages: mockMessages,
  },
  {
    id: '5',
    title: 'Jemima',
    description: 'Oi!',
    avatar: 'https://i.pravatar.cc/150?img=16',
    messages: mockMessages,
  },
];

export const getConversations = () =>
  new Promise(resolve => setTimeout(() => resolve(conversations), 1000));

export const getMessages = () =>
  new Promise(resolve => setTimeout(() => resolve(mockMessages), 1000));

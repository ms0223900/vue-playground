const TARGET_URI = 'https://zzz.some.abc/api';

const responseList = [
  {
    reqUrl: `${TARGET_URI}/posts`,
    reqMethod: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      postList: [
        {
          id: 0,
          title: 'Hi',
          content: 'post content here.',
        },
      ],
    },
  },

  {
    reqUrl: `${TARGET_URI}/abccc`,
    reqMethod: 'GET',
    status: 401,
    statusText: 'Not found',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      message: 'Not found',
    },
  },
];

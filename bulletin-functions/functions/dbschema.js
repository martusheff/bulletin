let db = {
    users: [
        {
            userId: 'dh23ggh5h32g543j5gf43',
            email: 'user@email.com',
            handle: 'user',
            createdAt: '2020-04-22T10:58:53.859Z',
            imageUrl: '/image/afkgjasoih/jkdkjafhdf',
            bio: 'Hello, my name is user, nice to meet you!',
            website: 'https://user.com',
            location: 'Scranton, PA'
        }
    ],
    pins: [
        {
            userHandle: 'user',
            body: 'this is the pin body',
            createdAt: '2020-10-02T04:16:13.344Z',
            likeCount: 5,
            commentCount: 2
        }
    ],
    comments: [
        {
        userHandle: 'user',
        pinId: '837tgr37hhdhdjh',
        body: 'nice job!',
        createdAt: '2020-10-02T04:16:13.344Z'
        }
    ]
}

const userDetails = {
    //Redux Data
    credentials: {
        userId: 'dh23ggh5h32g543j5gf43',
        email: 'user@email.com',
        handle: 'user',
        createdAt: '2020-04-22T10:58:53.859Z',
        imageUrl: '/image/afkgjasoih/jkdkjafhdf',
        bio: 'Hello, my name is user, nice to meet you!',
        website: 'https://user.com',
        location: 'Scranton, PA'
    },
    likes: [
        {
            userHandle: 'user',
            pinId: 'jlkhdskjf9839'
        },
        {
            userHandle: 'user',
            pinId: '30890fjgfd098'
        }
    ]
}
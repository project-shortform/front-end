import PocketBase from 'pocketbase'

const pb = new PocketBase('http://49.143.88.169:8090')

export const authData = await pb.collection('users').authWithOAuth2({ provider: 'kakao' })

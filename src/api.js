import axios from 'axios'
const GET_CHANGES_URL = 'https://us-east4-code-challenge-adt-security.cloudfunctions.net/bills_coins_changes'

export const getChangeReturned = async (cost, receive) => await axios.get(`${GET_CHANGES_URL}?cost=${cost}&receive=${receive}`)
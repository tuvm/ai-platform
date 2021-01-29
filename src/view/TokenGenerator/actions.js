import api from '../../utils/service/api';

export const actionGenerateToken = ({ params, payload }) => {
    const url = '/api-key/generate';
    try {
        return api({
          url,
          data: payload,
          method: "POST",
        });
    } catch(error) {
        console.log(error);
    }
}

export const actionGetToken = async () => {
    const url = '/api-key/generate';
    try {
        const { data } = await api({
            url,
            method: 'GET',
          });
      
          return data;
    } catch(error) {
        console.log(error);
    }

}
import axios from 'axios';

interface Metadata {
  title: string;
  description: string;
  image: string;
}

export async function getMetadata(url: string, apiKey: string): Promise<Metadata> {
  // Instagram URL 체크
  if (url.includes('instagram.com')) {
    return handleInstagramUrl(url);
  }

  // 일반 URL은 LinkPreview API 사용
  const response = await axios.get('https://api.linkpreview.net', {
    params: {
      q: url,
      key: apiKey
    }
  });

  return {
    title: response.data.title || '',
    description: response.data.description || '',
    image: response.data.image || ''
  };
}

async function handleInstagramUrl(url: string): Promise<Metadata> {
  // Instagram 포스트 ID 추출
  const match = url.match(/instagram\.com\/p\/([^/?]+)/);
  const postId = match ? match[1] : null;

  if (!postId) {
    throw new Error('올바른 Instagram URL이 아닙니다.');
  }

  // Instagram의 oEmbed API 사용
  try {
    const response = await axios.get(`https://api.instagram.com/oembed?url=${url}`);
    
    return {
      title: response.data.title || 'Instagram Post',
      description: response.data.author_name ? `By ${response.data.author_name}` : 'Instagram Post',
      image: `https://instagram.com/p/${postId}/media/?size=l` // 큰 사이즈의 이미지 URL
    };
  } catch (error) {
    // Instagram API 호출 실패시 기본값 반환
    return {
      title: 'Instagram Post',
      description: 'Instagram 게시물',
      image: 'https://via.placeholder.com/400?text=Instagram+Post'
    };
  }
}
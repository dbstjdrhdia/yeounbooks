import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini AI lazily/safely
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    return new GoogleGenAI({ apiKey });
  };

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // AI Assistant endpoint for generating essay drafts, book curation quotes, or SEO descriptions
  app.post('/api/ai/generate', async (req, res) => {
    try {
      const { type, prompt, topic, tone } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        // Return structured mock response if API key is not yet set in environment
        let sampleOutput = '';
        if (type === 'curation') {
          sampleOutput = `[AI 큐레이션 추천] "${topic || '삶과 서가'}"\n\n이 책은 빠르게 흘러가는 바쁜 도시의 일상 속에서 우리가 잠시 잊고 지낸 조용한 침묵과 사색의 순간을 다시 일깨워줍니다. 한 줄 한 줄 곱씹어 읽을 때마다 마음에 은은한 여운을 전하는 고요한 이정표 같은 문장들로 채워져 있습니다.`;
        } else if (type === 'essay') {
          sampleOutput = `[AI 에세이 초안] "${topic || '계절과 문장'}"\n\n가을 바람이 서늘하게 창문을 두드릴 때, 서가 구석에서 고른 책 한 권을 펼칩니다. 종이 특유의 바스락거리는 소리와 함께 오랫동안 담아두었던 마음속 깊은 생각들이 서서히 피어납니다. 언어라는 문틀을 지나 마음에 맴도는 긴 여운은 늘 가장 정직한 사유의 순간을 선사합니다.`;
        } else {
          sampleOutput = `[AI 마케팅 & SEO] "${topic || '여운책방'}"\n\n시간이 지나도 가치를 잃지 않는 에버그린 도서 큐레이션과 깊이 있는 감성 에세이 아카이브. 당신의 지친 일상에 깊은 조용한 휴식과 사색의 여운을 전합니다.`;
        }
        return res.json({ text: sampleOutput, status: 'fallback' });
      }

      let systemInstruction = "당신은 감성적이고 깊이 있는 문장으로 유명한 '여운책방(Yeoun Books)'의 전문 큐레이터이자 문학 에세이스트입니다. 품격 있고 정제된 한국어 문체로 작성해주세요.";
      
      let fullPrompt = "";
      if (type === 'curation') {
        fullPrompt = `주제/책제목: "${topic}". 요구사항: "${prompt}". 톤앤매너: ${tone || '감성적이고 사색적인'}. 이 책을 큐레이션하는 이유와 핵심 문구, 독자에게 전하는 여운이 남는 큐레이션 노트를 작성해주세요.`;
      } else if (type === 'essay') {
        fullPrompt = `에세이 주제: "${topic}". 아이디어/메모: "${prompt}". 톤앤매너: ${tone || '따뜻하고 솔직하며 문학적인'}. 시간에 구애받지 않고 언제 읽어도 깊은 감동을 주는 에버그린 에세이 초안(3~4개 단락)을 작성해주세요.`;
      } else {
        fullPrompt = `주제: "${topic}". 요청사항: "${prompt}". 여운책방 웹사이트 및 콘텐츠에 사용할 SEO 메타 설명 또는 소셜 미디어 홍보 문구를 작성해주세요.`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text, status: 'success' });
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      res.status(500).json({ error: err.message || 'AI 생성 중 오류가 발생했습니다.' });
    }
  });

  // Serve Frontend / Vite Middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({error:'Method not allowed'});
  }

  const token = '8384066749:AAHXenoUSt9EprnzHP1RGv9XSDRhPxthGvM'; // ganti
  const chat_id = '8331405438'; // ganti

  const { text } = req.body;

  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({chat_id,text})
    });
    const d = await r.json();
    res.status(200).json(d);
  } catch(e) {
    console.error(e);
    res.status(500).json({error:'Gagal kirim ke Telegram'});
  }
      }

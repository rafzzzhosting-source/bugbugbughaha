// api/send.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { text } = req.body;

  // ganti ini dengan token bot dan chat_id kamu
  const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN; // token bot
  const CHAT_ID = process.env.CHAT_ID; // chat_id kamu

  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

  try {
    const tgRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,         // kirim plain text apa adanya
        // parse_mode: 'MarkdownV2'  <-- jangan pakai parse_mode
      })
    });

    if (!tgRes.ok) {
      const errorText = await tgRes.text();
      console.error('Telegram error:', errorText);
      return res.status(500).json({ error: 'Failed to send to Telegram' });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error sending to Telegram' });
  }
}

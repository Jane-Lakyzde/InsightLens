export const runtime = 'edge';

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      function send(event: string, data: string) {
        controller.enqueue(encoder.encode(`event: ${event}\n`));
        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
      }
      // initial
      send('tick', JSON.stringify({ now: Date.now() }));
      const id = setInterval(() => {
        send('tick', JSON.stringify({ now: Date.now() }));
      }, 5000);
      const close = () => {
        clearInterval(id);
        controller.close();
      };
      // close after 1 hour
      setTimeout(close, 60 * 60 * 1000);
    },
  });
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}



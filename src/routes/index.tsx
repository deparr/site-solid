import { A } from "@solidjs/router";

export default function HomePage() {
  return (
    <>
      <h1 class="text-grad">Welcome!</h1>
      <p>I'm David, a programmer interested in programming languages, developer tools, terminals, and graphics.
        Here you'll find a bit about me, my projects, and maybe some related writing.
      </p>
      <ul>
        <li>Email: <A target="_blank" href="mailto:david+blog@dparrott.dev">david@dparrott.dev</A></li>
        <li>Github: <A target="_blank" href="https://github.com/deparr">deparr</A></li>
        <li>Resume: <A target="_blank" href="/resume.pdf">pdf</A></li>
      </ul>

      <h2 class="text-grad">Projects</h2>

      <h3>jolt.nvim</h3>
      <p>A plugin that turns Neovim into a static site generator with <A target="_blank" href="https://github.com/jgm/djot.lua">djot.lua</A>.
        It uses treesitter to accurately highlight code blocks. See the <A target="_blank" href="https://github.com/deparr/jolt.nvim">source</A>
      </p>
      <ul>
        <li><A href="/blog/neovim-static-sites">Building Static Sites with Neovim</A></li>
      </ul>

      <h3>site-tui</h3>
      <p>Serving my portfolio website over ssh using <A target="_blank" href="https://github.com/charmbracelet/wish">wish</A>.
        It used to be up on <code>tui.dparrott.dev</code>, but you can see a demo of it <A href="/images/site_tui.gif">here</A>.
        I still think using ssh for more than just remote shell access is cool though, so I'm currently rewriting it
        using <A target="_blank" href="https://github.com/sst/opentui">opentui</A>. See the <A target="_blank" href="https://github.com/deparr/site-tui">source</A>.
      </p>

      <h3>boids</h3>
      <p>A simple flocking simulation in Godot.
        Based on the flocks described in this <A target="_blank" href="https://www.cs.toronto.edu/~dt/siggraph97-course/cwr87/">paper</A>.
        See the <A target="_blank" href="https://github.com/deparr/boids">source</A>.
      </p>

      <h3>chip-8</h3>
      <p>A bytecode interpreter style emulator for the <A href="https://en.wikipedia.org/wiki/CHIP-8">chip-8 system</A>.
        I wrote it to learn more about emulation and a bit of SDL. It's not 100% accurate, the timing is a little off
        and sprites don't always wrap around edges cleanly, but it can play most roms.
        Emulators are a really interesting topic and something I'd like to take a proper deep dive into eventually. 
        See the <A target="_blank" href="https://github.com/deparr/chip8z">source</A>.
      </p>
    </>
  );
}

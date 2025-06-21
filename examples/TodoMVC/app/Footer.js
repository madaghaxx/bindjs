import html, { Link, frag, If, When } from "../src/index.js";
import { deleteCompleted, todos } from "./context/todos.js";

const { footer, span, ul, button, li } = html;

const isSelected = (path) => (location.pathname === path ? "selected" : "");

export const Footer = (filtred) => {
  const active = todos.filterRef((t) => !t.completed);
  return If(
    todos.len(),
    footer({ class: "footer" }).add(
      frag(
        When((w) => {
          return span({
            class: "todo-count",
            textContent: `${w(active).length} ${
              active().length === 1 ? "item" : "items"
            } left!`,
          });
        }),
        ul({ class: "filters" }).add(
          li().add(Link("/", "All", isSelected("/"))),
          li().add(Link("/active", "Active", isSelected("/active"))),
          li().add(Link("/completed", "Completed", isSelected("/completed")))
        ),
        button({
          class: "clear-completed",
          textContent: "Clear Completed",
          hidden: filtred.every((t) => !t.completed),
          onclick: deleteCompleted,
        })
      )
    )
  );
};

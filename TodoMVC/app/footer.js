import { A } from "rbind";
import html, { bindAs } from "rbind";
import { clearAll, todoList } from "./context/todos.js";
const { footer, li, span, ul, button } = html;

export const Footer = (filtred) => {
  const active = bindAs(todoList, "filter", (i) => !i.checked);

  return footer({ className: "footer", "date-testid": "footer" }).add(
    (w, c) => {
      return span({
        className: "todo-count",
        textContent: [
          bindAs(active, "length"),
          `${c(() => w(active).length === 1) ? "item" : "items"} left!`,
        ],
      });
    },
    ul({ className: "filters", "data-testid": "footer-navigaion" }).add(
      li().add(A("", "/", "All")),
      li().add(A("", "/active", "Active")),
      li().add(A("", "/completed", "Completed"))
    ),
    button({
      className: "clear-completed",
      textContent: "Clear completed",
      onclick: () => clearAll(filtred),
    })
  );
};

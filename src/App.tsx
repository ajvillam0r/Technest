import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import routes from "./routes";
import { ThemeProvider } from "@/components/ui/theme-provider";
import tempoRoutes from "tempo-routes";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="technest-theme">
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element}>
                {route.children?.map((childRoute, childIndex) => (
                  <Route
                    key={childIndex}
                    path={childRoute.path}
                    element={childRoute.element}
                    index={childRoute.index}
                  />
                ))}
              </Route>
            ))}
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(tempoRoutes)}
        </>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;

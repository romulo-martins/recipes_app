from flask_openapi3 import OpenAPI, Info, Tag
from flask_cors import CORS

info = Info(title="Recipes API", version="1.0.0")
app = OpenAPI(__name__, info=info)
CORS(app)

import routes.home
import routes.recipes

if __name__ == '__main__':
    app.run(debug=True)
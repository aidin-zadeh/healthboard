
import os
from healthboard import app


if __name__ == '__main__':
	port = int(os.environ.get('PORT', 8000))
	app.run(host='0.0.0.0', port=port)

    # app.run(debug=True)

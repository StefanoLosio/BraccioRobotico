import webview
from python.Api import *

api = Api()
window=webview.create_window('RobotArm GUI', "./prova/slider.html", js_api=api, width=500, height=550, resizable=True) #creo la finestra

webview.start(debug=False)
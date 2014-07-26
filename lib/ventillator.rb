require 'rubygems'
require 'ffi-rzmq'

context = ZMQ::Context.new(1)

# Socket to send messages on
sender = context.socket(ZMQ::PUSH)
sender.bind("tcp://*:5557")

puts "Sending tasks to workers…"

# The first message is "0" and signals start of batch
sender.send_string('well start mfckr1!')
sender.send_string('well start mfckr2!')
sender.send_string('well start mfckr3!')
sender.send_string('well start mfckr4!')
sender.send_string('well start mfckr5!')

puts "Sent"
Kernel.sleep(1)  # Give 0MQ time to deliver